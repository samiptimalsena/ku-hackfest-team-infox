# INFOX

![Logo](./assets/logo.png)

A SaaS that allows customers to voice-over using a model made by an established voice actor by purchasing NFTs issued by them. To access the model, NFT is intented to be used as an api key. The voice of a user can also be dubbed in a number of different languages.

## Acknowledgements

- [Vakyansh TTS](https://github.com/Open-Speech-EkStep/vakyansh-tts)

## API Reference

**Note** : We implemented microservice architecture for independency of modules. [Directory in Captials are individual services]

### TTS Inference Module

**Port** : 5000

#### Convert Text to Audio

```http
  POST /api/inference/${model_name}
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `model_name` | `string` | **Required**. Model name to use |

### TTS Train Module

**Port** : 5001

#### Uploading training audio

```http
  POST /api/upload
```

| Parameter | Type        | Description                                 |
| :-------- | :---------- | :------------------------------------------ |
| `files`   | `audio/wav` | **Required**. Audio files used for training |

### NFT Mint Module

**Port** : 5002

#### Launching new NFT collection

```http
  POST /api/create_collection
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `address` | `string` | **Required**. Creator wallet address |
| `price`   | `int`    | **Required**. Price per NFT          |

### NFT Validate Module

**Port** : 5003

#### Launching new NFT collection

```http
  POST /api/solana/validate_nft_access
```

| Parameter          | Type     | Description                            |
| :----------------- | :------- | :------------------------------------- |
| `address`          | `string` | **Required**. Customer wallet address  |
| `sig`              | `int`    | **Required**. Digital Signature        |
| `data`             | `int`    | **Required**. Signed Data              |
| `nft_mint_address` | `int`    | **Required**. Candy Machine Program ID |
