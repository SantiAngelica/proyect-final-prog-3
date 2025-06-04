import React from "react";
import styled from "styled-components";
import { SubTittleCard, TittleCard } from "../../styles/Cards";

const PropertyItem = ({ property }) => {
  console.log(property);
  return (
    <StyledWrapper>
      <div className="card w-full">
        <div className="title">
          <span className={TittleCard}>{property.name}</span>
          <span className={SubTittleCard}>{property.zone}</span>
          <span className="">Dirección: {property.adress}</span>
        </div>
        <div className="size">
          <span>Schedule:</span>
          <ul className="list-size">
            {property.schedules.map((sch) => (
              <li className="item-list item-list-button" key={sch.id}>
                {sch.schedule}
              </li>
            ))}
          </ul>
        </div>
        <div className="size">
          <span>Fields:</span>
          <ul className="list-size">
            {property.fields.map((fld) => (
              <li className="item-list item-list-button" key={fld.id}>
                {fld.field_type}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    --bg-card: #27272a;
    --primary: #6d28d9;
    --primary-800: #4c1d95;
    --primary-shadow: #2e1065;
    --light: #d9d9d9;
    --zinc-800: #18181b;
    --bg-linear: linear-gradient(0deg, var(--primary) 50%, var(--light) 125%);

    position: relative;

    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    padding: 1rem;
    width: fit-content;
    background-color: var(--bg-card);

    border-radius: 1rem;
  }

  .title {
    overflow: clip;

    width: 100%;

    font-size: 1rem;
    font-weight: 600;
    color: var(--light);
    text-transform: capitalize;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
  }

  .size {
    font-size: 0.75rem;
    color: var(--light);
  }

  .list-size {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    margin-top: 0.25rem;
  }

  .list-size .item-list {
    list-style: none;
  }

  .list-size .item-list-button {
    cursor: pointer;

    padding: 0.5rem;
    background-color: var(--zinc-800);

    font-size: 0.75rem;
    color: var(--light);

    border: 2px solid var(--zinc-800);
    border-radius: 0.25rem;

    transition: all 0.3s ease-in-out;
  }

  .item-list-button:hover {
    border: 2px solid var(--light);
  }
  .item-list-button:focus {
    background-color: var(--primary);

    border: 2px solid var(--primary-shadow);

    box-shadow: inset 0px 1px 4px var(--primary-shadow);
  }

  .action {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--light);
  }

  .cart-button {
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;

    padding: 0.5rem;
    width: 100%;
    background-image: var(--bg-linear);

    font-size: 0.75rem;
    font-weight: 500;
    color: var(--light);
    text-wrap: nowrap;

    border: 2px solid hsla(262, 83%, 58%, 0.5);
    border-radius: 0.5rem;
    box-shadow: inset 0 0 0.25rem 1px var(--light);
  }

  .cart-button .cart-icon {
    width: 1rem;
  }
`;

export default PropertyItem;
