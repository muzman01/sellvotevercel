const valid = (
  walletAdress,
  perMLink,
  transicaitonHash,
  fee,
  voteTo,
  voteWeigth,
  payState,
  processTime
) => {
  if (!walletAdress || !perMLink || !voteTo || !voteWeigth || !fee)
    return "Boş alanlar var lütfen doldur";
};

export default valid;
