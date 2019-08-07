class ValidationContract {
  constructor() {
    this.errors = [];
  }

  get AllErrors() {
    return this.errors;
  }

  get hasErrors() {
    return this.errors && this.errors.length > 0;
  }

  clearErrors() {
    return this.errors = [];
  }

  hasMinInteger(value, minValue, message) {
    if (!value || value < minValue) {
      this.errors.push({ message });
    }
  }

  hasMinLength(value, minValue, message) {
    if (!value || value.length < minValue) {
      this.errors.push({ message });
    }
  }
}

module.exports = ValidationContract;