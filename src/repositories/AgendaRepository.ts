import { isEqual } from 'date-fns';
import Agenda from '../models/Agenda';

interface CreateAgendaDTO {
  profissional: string;
  data: Date;
}

class AgendaRepository {
  private agenda: Agenda[];

  constructor() {
    this.agenda = [];
  }

  public all(): Agenda[] {
    return this.agenda;
  }

  public findByDate(data: Date): Agenda | null {
    const agendamentoComDatasIguais = this.agenda.find(agendamento =>
      isEqual(data, agendamento.data),
    );

    return agendamentoComDatasIguais || null;
  }

  public create({ profissional, data }: CreateAgendaDTO): Agenda {
    const agendamento = new Agenda({ profissional, data });

    this.agenda.push(agendamento);

    return agendamento;
  }
}

export default AgendaRepository;
