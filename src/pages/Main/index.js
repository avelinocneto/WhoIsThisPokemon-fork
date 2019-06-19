import React, { useState, useEffect, useRef } from "react";

import {
	Container,
	Logo,
	Title,
	Pokemon,
	Content,
	Footer,
	ButtonContainer,
	Button,
	ButtonText,
	Input
} from "./styles";

export default function main() {
	const [pokemon, setPokemon] = useState(null);
	const [pokeName, setPokeName] = useState("");
	const [showPokemon, setShowPokemon] = useState(false);
	const pokeImage = useRef(null);
	const buttons = [];

	async function getPokemon() {
		setShowPokemon(false);

		const randomRightNumber = Math.round(Math.random() * 2 + 1);
		for (let i = 0; i < 4; i++) {
			const randomPokeNumber = Math.round(Math.random() * 150 + 1);
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${randomPokeNumber}`,
				{ method: "GET" }
			);
			const responseJSON = await response.json();
			const isRight = false;
			if (i == randomRightNumber) {
				setPokemon(responseJSON);
				isRight = true;
			}
			const component = () => <Buttton key={responseJSON.name} data-isright={isRight}>{responseJSON.name.toUpperCase()} teste</Buttton>
			buttons.push({ element: component });

		}
		console.log(buttons);
		console.log(pokemon);
	}

	function validatePokeName() {
		if (pokeName.toUpperCase() == pokemon.name.toUpperCase())
			console.warn(`ACERTOU`);
		else console.warn(`ERROU`, pokemon.name.toUpperCase());
		setShowPokemon(true);
	}

	useEffect(() => {
		getPokemon();
	}, []);

	return (
		<Container>
			<Content>
				<Title />
				<Logo />
				<Pokemon
					showPokemon={showPokemon}
					source={{ uri: !!pokemon ? pokemon.sprites.front_default : "" }}
				/>
			</Content>
			<Footer>
				<Input onChangeText={setPokeName} />
				<ButtonContainer
					onPress={validatePokeName}
					buttons={buttons}
				/>
			</Footer>
		</Container>
		/* <Button onPress={getPokemon}>
				<ButtonText>PULAR</ButtonText>
			  </Button> */
	);
}
