class Agenda {
  id?: string;

  profissional: string;

  data: Date;

  constructor({ profissional, data }: Omit<Agenda, 'id'>) {
    this.profissional = profissional;
    this.data = data;
  }
}

export default Agenda;
