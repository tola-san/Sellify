<?php

namespace App\Services;

use App\Models\IssueReport;
use Illuminate\Support\Str;

class IssueReportTelegramService
{
    public function __construct(private readonly TelegramNotificationService $telegram) {}

    public function notifyAdmin(IssueReport $report): bool
    {
        $chatId = trim((string) config('services.telegram.admin_chat_id'));
        if ($chatId === '') {
            return false;
        }

        $report->loadMissing(['user', 'business']);
        $businessName = $report->business?->name ?? 'No business';
        $owner = $report->user?->name ?? $report->user?->email ?? 'Unknown owner';
        $page = $report->page_url
            ? "\n<b>Page</b>\n".$this->escape($report->page_url)
            : '';

        $message = implode("\n", [
            '🐞 <b>New SellFlow issue report</b>',
            '<code>#IR-'.str_pad((string) $report->id, 6, '0', STR_PAD_LEFT).'</code> · '.$this->escape(Str::headline($report->type)),
            '',
            '<b>Business</b>  '.$this->escape($businessName),
            '<b>Owner</b>  '.$this->escape($owner),
            '',
            '<b>'.$this->escape($report->title).'</b>',
            '<blockquote>'.$this->escape(Str::limit($report->description, 1800)).'</blockquote>',
            $page,
        ]);

        $this->telegram->sendMessage($chatId, trim($message), 'HTML');

        return true;
    }

    private function escape(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}
