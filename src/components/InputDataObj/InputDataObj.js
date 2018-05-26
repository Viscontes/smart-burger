import PropTypes from 'prop-types';

const textInputObj = (props) => {
  return {
    elementConfig: {
      type: props.type,
      id: props.id,
      name: props.id,
      placeholder: props.placeholder
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  }
}

const radioSelectObj = (props) => {
  return {
    elementConfig: {
      type: props.type,
      id: props.id,
      name: props.name
    },
    value: props.id,
    checked: false,
    validation: {
      required: true
    },
    touched: false
  }
}

textInputObj.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string
}

radioSelectObj.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool
}

export { textInputObj, radioSelectObj };