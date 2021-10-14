type PremiumLabelProps = {
  className: string;
}

function PremiumLabel({className}: PremiumLabelProps): JSX.Element {
  return (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
}

export default PremiumLabel;
