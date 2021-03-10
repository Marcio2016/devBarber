import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import AgendaRepository from '../repositories/AgendaRepository';
import CreateAgendamentoService from '../services/CreateAgendamentoService';

const agendamentosRoutes = Router();

agendamentosRoutes.post('/', async (request, response) => {
  try {
    const { profissional, data } = request.body;

    const parsedDate = parseISO(data);

    const service = new CreateAgendamentoService();

    const agendamento = await service.execute({
      profissional,
      data: parsedDate,
    });

    return response.json(agendamento);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

agendamentosRoutes.get('/', async (request, response) => {
  const repository = getCustomRepository(AgendaRepository);
  const agendamentos = await repository.findOne();

  return response.json(agendamentos);
});

export default agendamentosRoutes;
