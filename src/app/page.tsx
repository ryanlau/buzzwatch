import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import AddCRNForm from "@/components/AddCRNForm";
import { db } from "@/lib/db";
import MonitoringCRNList from "@/components/MonitoringCRNList";

import Header from "@/components/Header";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <>
        <Header signedIn={false} />

        <div>
          <div className="py-2">
            want a seat in a specific section? buzz will send you an email when
            a seat opens up!
          </div>
        </div>
      </>
    );
  }

  const monitoredCRNs = (
    await db
      .selectFrom("request")
      .where("userId", "=", session.user.id)
      .select("crnId")
      .execute()
  ).map((row) => row.crnId);

  return (
    <>
      <Header signedIn={true} />
      <div className="flex flex-col gap-2">
        <div>
          <AddCRNForm />
        </div>
        <div className="pb-4">
          <div className="text-3xl font-semibold">monitoring</div>
          <MonitoringCRNList crns={monitoredCRNs} />
        </div>
      </div>
    </>
  );
}
