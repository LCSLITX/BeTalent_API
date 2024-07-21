import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

// This middleware removes all dots and hyphens from the CPF.
// The client model has a beforeSave hook that formats the CPF with dots and hyphens.

export default class CpfParserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    let cpf = ctx.request.input('cpf')
    if (cpf) {
      cpf = cpf.replaceAll('.', '').replace('-', '');
      ctx.request.updateBody({ ...ctx.request.body(), cpf })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}