export type Initiative = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

export type CreateInitiativeInput = {
  title: string;
  description: string;
};
