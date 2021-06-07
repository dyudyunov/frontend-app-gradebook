/* eslint-disable react/sort-comp, react/button-has-type, import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Button,
  Modal,
  StatusAlert,
} from '@edx/paragon';

import selectors from 'data/selectors';
import actions from 'data/actions';
import thunkActions from 'data/thunkActions';

import OverrideTable from './OverrideTable';
import ModalHeaders from './ModalHeaders';

export class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.closeAssignmentModal = this.closeAssignmentModal.bind(this);
    this.handleAdjustedGradeClick = this.handleAdjustedGradeClick.bind(this);
  }

  closeAssignmentModal() {
    this.props.doneViewingAssignment();
    this.props.closeModal();
  }

  handleAdjustedGradeClick() {
    this.props.updateGrades();
    this.closeAssignmentModal();
  }

  render() {
    return (
      <Modal
        open={this.props.open}
        title="Edit Grades"
        closeText="Cancel"
        body={(
          <div>
            <ModalHeaders />
            <StatusAlert
              alertType="danger"
              dialog={this.props.gradeOverrideHistoryError}
              open={!!this.props.gradeOverrideHistoryError}
              dismissible={false}
            />
            <OverrideTable />
            <div>Showing most recent actions (max 5). To see more, please contact
              support.
            </div>
            <div>Note: Once you save, your changes will be visible to students.</div>
          </div>
        )}
        buttons={[
          <Button variant="primary" onClick={this.handleAdjustedGradeClick}>
            Save Grade
          </Button>,
        ]}
        onClose={this.closeAssignmentModal}
      />
    );
  }
}

EditModal.defaultProps = {
  gradeOverrideHistoryError: '',
};

EditModal.propTypes = {
  // redux
  gradeOverrideHistoryError: PropTypes.string,
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  doneViewingAssignment: PropTypes.func.isRequired,
  updateGrades: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  gradeOverrideHistoryError: selectors.grades.gradeOverrideHistoryError(state),
  open: selectors.app.modalState.open(state),
});

export const mapDispatchToProps = {
  closeModal: actions.app.closeModal,
  doneViewingAssignment: actions.grades.doneViewingAssignment,
  updateGrades: thunkActions.grades.updateGrades,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
