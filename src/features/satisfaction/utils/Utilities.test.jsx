import * as tools from './Utilities';

describe('getFactor', () => {
  it('should handle 10 variables', () => {
    expect(
      tools.getFactor({
        salary: 0.1,
        satisfaction: 0.075,
        employability: 0.075,
        sideproject: 0.05,
        culture: 0.05,
        health: 0.05,
        location: 0.025,
        teamwork: 0.025,
        prospect: 0.025,
        interaction: 0.025,
      })
    ).toEqual(50);
  });

  it('should handle 7 variables', () => {
    expect(
      tools.getFactor({
        salary: 0.1,
        employability: 0.075,
        sideproject: 0.05,
        health: 0.05,
        location: 0.025,
        teamwork: 0.025,
        prospect: 0.025,
      })
    ).toEqual(35);
  });
});

describe('getMessage', () => {
  it('should handle danger alert', () => {
    expect(tools.getMessage(37)).toEqual({
      className: 'alert-danger',
      message: 'Think twice about taking the job, or leaving it right away.',
    });
  });

  it('should handle warning alert', () => {
    expect(tools.getMessage(66)).toEqual({
      className: 'alert-warning',
      message: "You're on the right track to finding the perfect job.",
    });
  });

  it('should handle primary alert', () => {
    expect(tools.getMessage(88)).toEqual({
      className: 'alert-primary',
      message: 'The job is for you.',
    });
  });

  it('should handle success alert', () => {
    expect(tools.getMessage(95)).toEqual({
      className: 'alert-success',
      message: 'You got the perfect job!',
    });
  });
});
