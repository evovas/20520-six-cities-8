type PremiumLabelProps = {
  className: string;
}

function PremiumLabel({className}: PremiumLabelProps): JSX.Element {
  return (
    <div className={className} data-testid='premium-label'>
      <span>Premium</span>
    </div>
  );
}

export default PremiumLabel;
