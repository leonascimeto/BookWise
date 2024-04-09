import Lend from '../../domain/entity/Lend';
import LendRepository from '../repository/LendRepository';

export default class FindPeendingLendsUseCase {
  constructor(private readonly lendRepository: LendRepository) {}

  async execute(): Promise<Lend[]> {
    return this.lendRepository.findPendingLends();
  }
}
