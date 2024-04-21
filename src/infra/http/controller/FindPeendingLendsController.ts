import FindPeendingLendsUseCase from '../../../application/usecase/FindPeendingLendsUseCase';
import Lend from '../../../domain/entity/Lend';
import { formatErrorResponse, HttpResponse } from '../HttpResponse';

export default class FindPeendingLendsController {
  constructor(private readonly findPeendingLendsUseCase: FindPeendingLendsUseCase) {}

  async handle(): Promise<HttpResponse<Lend[] | any>> {
    try {
      const pendingLends = await this.findPeendingLendsUseCase.execute();
      return {
        status: 200,
        body: pendingLends,
      };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }
}
