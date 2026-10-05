import { CircleButtons } from './threeui/CircleButtons';

export default function NeuAction({ label, mode = 'dark', variant = 'play', ...props }) {
  return <CircleButtons {...props} mode={mode} variant={variant} label={label} ariaLabel={label} className="neu-action" />;
}
