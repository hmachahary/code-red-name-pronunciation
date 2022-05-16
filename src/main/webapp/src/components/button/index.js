import PropTypes from "prop-types";
import "./styles.css";

export default function Button({ children, type, onClick, title, disabled, size }) {
	const btnSize = size ? `wf_btn-${size}` : "";
	return (
		<button
			title={title}
			onClick={onClick}
			className={`wf_btn ${btnSize} wf_btn-${type} ${disabled ? `wf_btn-${type}-disabled` : ""}`}
			disabled={disabled}
		>
			{children}
		</button>
	);
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
