class PolarPoint {
  constructor(theta, rho) {
    this.theta = theta
    this.rho = rho
  }

  toCartesianPoint() {
    return {
      x: this.rho * Math.cos(this.theta),
      y: this.rho * Math.sin(this.theta),
    }
  }
}

export default PolarPoint