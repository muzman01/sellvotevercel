const valid = (walletAdress, perMLink, fee, voteTo, voteWeigth) => {
  if (!walletAdress || !perMLink || !voteTo || !voteWeigth || !fee)
    return "Boş alanlar var lütfen doldur";
};

export default valid;
