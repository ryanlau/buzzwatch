"use client";

import Form from "next/form";
import { addCRN } from "@/app/actions/updateCRN";
import { useActionState } from "react";

const initialState = {
  message: "",
};

export default function AddCRNForm() {
  const [state, formAction, isPending] = useActionState(addCRN, initialState);

  return (
    <>
      <Form action={formAction}>
        <input
          type="text"
          name="crn"
          className="mr-2 rounded border-gray-200 bg-gray-200"
        />
        <button
          disabled={isPending}
          className="mr-2 rounded-md bg-gray-200 px-2"
          type="submit"
        >
          {isPending ? "adding..." : "add crn"}
        </button>
        {state.message}
      </Form>
    </>
  );
}
