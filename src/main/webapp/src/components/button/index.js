import PropTypes from "prop-types";
import "./styles.css";

export default function Button({ children, type, onClick }) {
	return <button className={`wf_btn`}>{children}</button>;
}

Button.defaultProps = {
	type: "primary",
	children: "Button",
	onClick: () => {},
};

Button.propTypes = {
	type: PropTypes.oneOf(["primary", "secondary", "success", "info"]),
	children: PropTypes.node,
	onClick: PropTypes.func,
};
