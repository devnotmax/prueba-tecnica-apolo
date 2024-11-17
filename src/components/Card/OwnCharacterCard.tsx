import React from "react";
import "./Card.css";



interface CardProps {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
}

const OwnCharacterCard: React.FC<CardProps> = (props: CardProps) => {
    return (
        <div className="card">
            <img src={props.image} alt={props.name} className="card-image" />
            <div className="card-content">
                <h2 className="card-name">{props.name}</h2>
                <p className="card-species">Species: {props.species}</p>
                <p className="card-gender">Gender: {props.gender}</p>
                <p className={`card-status ${props.status.toLowerCase()}`}>
                    Status: {props.status}
                </p>
            </div>
        </div>
    );
};

export default OwnCharacterCard;
