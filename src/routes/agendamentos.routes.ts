import { Router } from 'express';
import { parseISO } from 'date-fns';

import AgendaRepository from '../repositories/AgendaRepository';
import CreateAgendamentoService from '../services/CreateAgendamentoService';

const agendamentosRoutes = Router();

const agendaRepository = new AgendaRepository();

agendamentosRoutes.post('/', (request, response) => {
  try {
    const { id, profissional, data } = request.body;

    const parsedDate = parseISO(data);

    const createAgendamento = new CreateAgendamentoService(agendaRepository);

    const agendamento = createAgendamento.execute({
      profissional,
      data: parsedDate,
    });
    return response.json(agendamento);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

agendamentosRoutes.get('/', (request, response) => {
  const agendamentos = agendaRepository.all();

  return response.json(agendamentos);
});

export default agendamentosRoutes;
