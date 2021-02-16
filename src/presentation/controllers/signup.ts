import { badRequest, serverError } from '../helpers/http-helper'
import { EmailValidator, HttpResponse, HttpRequest, Controller } from '../../protocols'
import { MissingParamError, InvalidParamError } from '../errors'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
