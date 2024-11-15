"use client";
import { removeCRN } from "@/app/actions/updateCRN";
import { useOptimistic, useTransition } from "react";

interface MonitoringCRNListProps {
  crns: string[];
}
export default function MonitoringCRNList({ crns }: MonitoringCRNListProps) {
  const [optimisticCRNs, setOptimisticCRNs] = useOptimistic(
    crns,
    (state, crnToRemove: string) => state.filter((crn) => crn !== crnToRemove),
  );
  const [, startTransition] = useTransition();

  const handleRemoveCRN = (crnToRemove: string) => {
    startTransition(async () => {
      setOptimisticCRNs(crnToRemove);
      await removeCRN(crnToRemove);
    });
  };

  if (crns.length == 0) {
    return <div>nothing</div>;
  }

  return (
    <div>
      {optimisticCRNs.map((crn) => (
        <div key={crn} className="flex gap-2">
          <div
            className="cursor-pointer hover:font-bold"
            onClick={() => handleRemoveCRN(crn)}
          >
            x
          </div>
          <div>{crn}</div>
        </div>
      ))}
    </div>
  );
}
