export type TalentProfile = {
  id: string;
  profesion: string;
  experiencia: string;
  descripcion: string;
  lugarTrabajoAnterior: string;
  habilidades: string;
  linkedin: string;
  redesSociales: string;
  createdBy: string;
  createdAt: string;
  publicante: {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
  };
};

export type CreateTalentProfileInput = {
  profesion: string;
  experiencia: string;
  descripcion: string;
  lugarTrabajoAnterior: string;
  habilidades: string;
  linkedin?: string;
  redesSociales?: string;
};

export type UpdateTalentProfileInput = CreateTalentProfileInput;
