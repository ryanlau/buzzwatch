"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function addCRN(_: { message: string }, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { message: "you must be logged in to add a crn" };
  }

  const userId = session.user.id;
  const crnId = formData.get("crn") as string;

  // check if the crnId exists in the crn table, create it if it doesn't
  const existingCrn = await db
    .selectFrom("crn")
    .where("id", "=", crnId)
    .selectAll()
    .executeTakeFirst();

  if (!existingCrn) {
    await db.insertInto("crn").values({ id: crnId }).execute();
  }

  // check if the user already has a request with the current crn
  const existingRequest = await db
    .selectFrom("request")
    .selectAll()
    .where((eb) => eb.and({ userId, crnId }))
    .executeTakeFirst();

  if (existingRequest) {
    return { message: "already monitoring" };
  }

  // add the request to the requests table
  await db.insertInto("request").values({ userId, crnId }).execute();

  revalidatePath("/");
  return { message: "added!" };
}

export async function removeCRN(crnId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return;
  }
  const userId = session.user.id;

  await db
    .deleteFrom("request")
    .where((eb) => eb.and({ userId, crnId }))
    .execute();

  revalidatePath("/");
}
