export enum ErrorResponse {
    dataInvalid = "DATA_INCORRECT",
    userNoExits = "USER_NO_EXITS",
    errorDataBase = "ERROR_DATA_BASE",
    userExits = "USER_EXITS",
    passwordInvalid = "PASS_INVALID",
    empresaExist = "EMPRESA_EXIST",
    calificacionExist = "CALIFICACION_EXITS",
    emailFailSend = "EMAIL_SEND_FAILD",
    productoExist = "PRODUCT_EXIST"
  }

  export interface ErrorHttpResponse {
    error: ErrorResponse
  }