import { useMemo } from "react";
import { mockHealthService } from "../services/mock-health-service";

export function useDashboardData() {
  return useMemo(() => mockHealthService.getDashboardSnapshot(), []);
}
