import "./styles.css";

export default function Switch() {
	return (
		<label class="switch">
			<input type="checkbox" checked />
			<span class="slider round"></span>
		</label>
	);
}
