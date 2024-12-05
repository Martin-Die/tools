import React from 'react';

const LegalForm = ({ formData, setFormData }) => {
	const handleReset = () => {
		setFormData({
			companyName: "",
			address: "",
			email: "",
			phone: "",
			siren: "",
			director: "",
			host: "",
			hostAddress: "",
		});
	};

	return (
		<div>
			<h2>Informations de l'entreprise</h2>
			<form>
				<div>
					<label>Nom de l'entreprise</label>
					<input
						type="text"
						value={formData.companyName}
						onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
						placeholder="Votre entreprise"
						required
					/>
				</div>
				<div>
					<label>Adresse</label>
					<input
						type="text"
						value={formData.address}
						onChange={(e) => setFormData({ ...formData, address: e.target.value })}
						placeholder="Adresse complète"
						required
					/>
				</div>
				<div>
					<label>Email</label>
					<input
						type="email"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						placeholder="contact@entreprise.fr"
						required
					/>
				</div>
				<div>
					<label>Téléphone</label>
					<input
						type="tel"
						value={formData.phone}
						onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
						placeholder="01 23 45 67 89"
						required
					/>
				</div>
				<div>
					<label>Numéro SIREN</label>
					<input
						type="text"
						value={formData.siren}
						onChange={(e) => setFormData({ ...formData, siren: e.target.value })}
						placeholder="123 456 789"
						required
					/>
				</div>
				<div>
					<label>Directeur de publication</label>
					<input
						type="text"
						value={formData.director}
						onChange={(e) => setFormData({ ...formData, director: e.target.value })}
						placeholder="Nom du directeur"
						required
					/>
				</div>
				<div>
					<label>Hébergeur</label>
					<input
						type="text"
						value={formData.host}
						onChange={(e) => setFormData({ ...formData, host: e.target.value })}
						placeholder="Nom de l'hébergeur"
						required
					/>
				</div>
				<div>
					<label>Adresse de l'hébergeur</label>
					<input
						type="text"
						value={formData.hostAddress}
						onChange={(e) => setFormData({ ...formData, hostAddress: e.target.value })}
						placeholder="Adresse de l'hébergeur"
						required
					/>
				</div>
				<button
					type="button"
					onClick={handleReset}
				>
					Réinitialiser
				</button>
			</form>
		</div>
	);
};

export default LegalForm;