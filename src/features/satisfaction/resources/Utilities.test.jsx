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
        outlook: 0.025,
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
        outlook: 0.025,
      })
    ).toEqual(35);
  });
});

describe('getMessage', () => {
  it('should handle danger alert', () => {
    expect(tools.getMessage(37)).toEqual({
      className: 'alert-danger',
      message:
        'Songez à deux fois avant d’accepter le job, ou le quitter sur-le-champ.',
    });
  });

  it('should handle warning alert', () => {
    expect(tools.getMessage(66)).toEqual({
      className: 'alert-warning',
      message: 'Vous êtes sur la bonne voie pour trouver le job parfait.',
    });
  });

  it('should handle primary alert', () => {
    expect(tools.getMessage(88)).toEqual({
      className: 'alert-primary',
      message: 'Le job vous correspond.',
    });
  });

  it('should handle success alert', () => {
    expect(tools.getMessage(95)).toEqual({
      className: 'alert-success',
      message: 'Vous avez le job parfait !',
    });
  });
});
