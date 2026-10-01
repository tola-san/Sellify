import api from "../lib/Axios";

export type IssueType = "bug" | "account" | "billing" | "feature_request" | "other";

export interface CreateIssueReportPayload {
  type: IssueType;
  title: string;
  description: string;
  page_url?: string;
}

export const issueReportService = {
  async create(payload: CreateIssueReportPayload): Promise<{ id: number; status: string }> {
    const response = await api.post<{
      success: boolean;
      data: { id: number; status: string };
    }>("/issue-reports", payload);

    return response.data.data;
  },
};
