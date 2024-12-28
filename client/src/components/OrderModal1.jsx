const handleOrder = async () => {
  await generalOrder();
  if (success) {
    const whatsappLink = `https://wa.me/250792412177?text=${encodeURIComponent(whatsappMessage)}`;
    setTimeout(() => {
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    }, 2000);

    setTimeout(() => {
      clearOrderDetails();
    }, 3000);
  }
}; 