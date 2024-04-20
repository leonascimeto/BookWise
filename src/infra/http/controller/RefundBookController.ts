import { z } from 'zod';

import RefundBookUseCase from '../../../application/usecase/RefundBookUseCase';
import { formatErrorResponse, HttpResponse } from '../HttpResponse';

const refundBookSchemaBody = z.object({
  refundDate: z.string({ required_error: 'Refund date is required' }).regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Refund date must have the format yyyy-mm-dd',
  }),
});

const refundBookSchemaParams = z.object({
  lendId: z.string({ required_error: 'Lend ID is required' }).uuid({ message: 'Lend ID must be a valid UUID' }),
});

export default class RefundBookController {
  constructor(private readonly refundBookUseCase: RefundBookUseCase) {}

  async handle(input: RefundBookRequest): Promise<HttpResponse<any>> {
    try {
      const { lendId } = refundBookSchemaParams.parse(input.params);
      const { refundDate } = refundBookSchemaBody.parse(input.body);
      await this.refundBookUseCase.execute({ lendId, refundDate });
      return { status: 204 };
    } catch (error) {
      return formatErrorResponse(error);
    }
  }
}

export type RefundBookRequest = {
  body: {
    refundDate: string;
  };
  params: {
    lendId: string;
  };
};
