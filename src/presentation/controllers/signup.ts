import { badRequest } from '../helpers/http-helper'
import { HttpResponse, HttpRequest } from '../../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
