"use client";

import { useActionState } from "react";
import {
  joinVolunteerAction,
  type JoinVolunteerState,
} from "@/lib/actions/initiatives";
import { Button, FormMessage } from "@/components/ui/form";

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
    return (
      <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700">
        Ya estás inscrito
      </span>
    );
  }

  if (state.success) {
    return (
      <FormMessage tone="success">Te uniste como voluntario.</FormMessage>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="initiativeId" value={initiativeId} />
      {state.error ? <FormMessage tone="error">{state.error}</FormMessage> : null}
      <Button type="submit" variant="secondary" disabled={isPending}>
        {isPending ? "Uniendo..." : "Unirme como voluntario"}
      </Button>
    </form>
  );
}
