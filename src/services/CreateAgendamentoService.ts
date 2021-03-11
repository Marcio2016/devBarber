import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Agenda from '../models/Agenda';
import AgendaRepository from '../repositories/AgendaRepository';

interface Request {
  // eslint-disable-next-line camelcase
  profissional_id: string;
  data: Date;
}

class CreateAgendamentoService {
  // eslint-disable-next-line camelcase
  public async execute({ profissional_id, data }: Request): Promise<Agenda> {
    const repository = getCustomRepository(AgendaRepository);

    const dataRecebida = startOfHour(data);
    const agendamentoComDatasIguais = await repository.findByDate(dataRecebida);

    if (agendamentoComDatasIguais) {
      throw Error('Este horário já está preenchida');
    }
    const agendamento = repository.create({
      profissional_id,
      data: dataRecebida,
    });

    await repository.save(agendamento);

    return agendamento;
  }
}

export default CreateAgendamentoService;
