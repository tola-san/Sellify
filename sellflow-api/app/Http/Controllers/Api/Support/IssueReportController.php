<?php

namespace App\Http\Controllers\Api\Support;

use App\Http\Controllers\Controller;
use App\Http\Requests\Support\StoreIssueReportRequest;
use App\Models\IssueReport;
use App\Services\IssueReportTelegramService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class IssueReportController extends Controller
{
    public function __construct(private readonly IssueReportTelegramService $telegram) {}

    public function store(StoreIssueReportRequest $request): JsonResponse
    {
        $user = $request->user();
        $report = IssueReport::create([
            ...$request->validated(),
            'user_id' => $user->id,
            'business_id' => $user->business?->id,
            'status' => 'open',
            'user_agent' => mb_substr((string) $request->userAgent(), 0, 2000),
        ]);

        try {
            $this->telegram->notifyAdmin($report);
        } catch (\Throwable $exception) {
            Log::warning('Issue report saved but Telegram admin notification failed.', [
                'issue_report_id' => $report->id,
                'exception' => $exception->getMessage(),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Your report has been submitted.',
            'data' => [
                'id' => $report->id,
                'status' => $report->status,
                'created_at' => $report->created_at?->toISOString(),
            ],
        ], 201);
    }
}
