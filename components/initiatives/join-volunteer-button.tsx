"use client";

import { useActionState } from "react";
import {
  joinVolunteerAction,
  type JoinVolunteerState,
} from "@/lib/actions/initiatives";

type JoinVolunteerButtonProps = {
  initiativeId: string;
  isJoined: boolean;
};

const initialState: JoinVolunteerState = {};

export function JoinVolunteerButton({
  initiativeId,
  isJoined,
}: JoinVolunteerButtonProps) {
  const [state, formAction, isPending] = useActionState(
    joinVolunteerAction,
    initialState,
  );

  if (isJoined || state.alreadyJoined) {
    return <p className="text-sm">Ya estás inscrito como voluntario.</p>;
  }

  if (state.success) {
    return <p className="text-sm">Te uniste como voluntario.</p>;
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="initiativeId" value={initiativeId} />
      {state.error ? <p className="mb-2 text-sm">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="border border-black px-4 py-1.5 text-sm disabled:opacity-50"
      >
        {isPending ? "Uniendo..." : "Unirme como voluntario"}
      </button>
    </form>
  );
}
