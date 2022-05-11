import PropTypes from "prop-types";
import "./styles.css";

export default function Horizontal({ lineWidth }) {
	return <div className={`wf_hrline wf_hrline-${lineWidth}`}></div>;
}

Horizontal.defaultProps = {
	lineWidth: 1,
};
