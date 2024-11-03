export interface Validator<INPUT, RESPONSE> {
  validate(value: INPUT): Promise<RESPONSE>;
}
