import Question from '../nested/Question';
import { QUESTIONS } from '../resources/constants';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Satisfaction = () => (
  <div className="container mt-5">
    <div className="row justify-content-md-center">
      <div className="col-lg-8">
        <h1 className="display-4">Satisfaction</h1>
        <blockquote className="blockquote">
          <footer className="blockquote-footer">
            Calcul du Confidence Factor · Source : Brett Nelson
          </footer>
        </blockquote>

        {QUESTIONS.map(({ label, importance }, index) => (
          <Question key={index} label={label} importance={importance} />
        ))}
      </div>
    </div>

    <div className="row justify-content-md-center align-items-center">
      <div className="col-lg-3">
        <div className="alert alert-light" role="alert">
          Confidence Factor : <span data-bind="text: result"></span>%
        </div>
      </div>

      <div className="col-lg-5">
        <div
          className="alert alert-success"
          data-bind="visible: showSuccess()"
          role="alert"
        >
          Vous avez le job parfait !
        </div>

        <div
          className="alert alert-info"
          data-bind="visible: showInfo()"
          role="alert"
        >
          Le job vous correspond.
        </div>

        <div
          className="alert alert-warning"
          data-bind="visible: showWarning()"
          role="alert"
        >
          Vous êtes sur la bonne voie pour trouver le job parfait.
        </div>

        <div
          className="alert alert-danger"
          data-bind="visible: showDanger()"
          role="alert"
        >
          Songez à deux fois avant d’accepter le job, ou le quitter
          sur-le-champ.
        </div>
      </div>
    </div>
  </div>
);

export default Satisfaction;
