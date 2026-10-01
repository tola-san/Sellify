<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class IssueReportApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_owner_can_submit_an_issue_report(): void
    {
        config([
            'services.telegram.bot_token' => 'TEST_TOKEN',
            'services.telegram.admin_chat_id' => '-100123456',
        ]);
        Http::fake(['https://api.telegram.org/*' => Http::response(['ok' => true])]);
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->postJson('/api/v1/issue-reports', [
            'type' => 'bug',
            'title' => 'Orders page does not refresh',
            'description' => 'A new order only appears after reloading the browser.',
            'page_url' => 'https://sellflow.example/dashboard/orders',
        ])
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.status', 'open');

        $this->assertDatabaseHas('issue_reports', [
            'user_id' => $user->id,
            'type' => 'bug',
            'title' => 'Orders page does not refresh',
            'status' => 'open',
        ]);
        Http::assertSent(fn ($request) => $request->url() === 'https://api.telegram.org/botTEST_TOKEN/sendMessage'
            && $request['chat_id'] === '-100123456'
            && $request['parse_mode'] === 'HTML'
            && str_contains($request['text'], 'Orders page does not refresh'));
    }

    public function test_report_is_stored_when_admin_telegram_is_not_configured(): void
    {
        Http::preventStrayRequests();
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $this->postJson('/api/v1/issue-reports', [
            'type' => 'other',
            'title' => 'I need help',
            'description' => 'Please contact me about this issue.',
        ])->assertCreated();

        $this->assertDatabaseHas('issue_reports', [
            'user_id' => $user->id,
            'title' => 'I need help',
        ]);
        Http::assertNothingSent();
    }

    public function test_issue_report_fields_are_validated(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->postJson('/api/v1/issue-reports', [
            'type' => 'unknown',
            'title' => '',
            'description' => '',
        ])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['type', 'title', 'description']);
    }

    public function test_issue_reporting_requires_authentication(): void
    {
        $this->postJson('/api/v1/issue-reports', [])->assertUnauthorized();
    }
}
