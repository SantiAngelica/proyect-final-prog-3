import React from 'react'
import styled from 'styled-components';

function PropertyItem({property}) {
    console.log(property)
    return (
        <div>
            <StyledWrapper>
                <div className="card">
                    <div className="title">
                        <span>{property.name}</span>
                        <span>{property.adress}</span>
                    </div>
                    <div className="size">
                        <span>Canchas:</span>
                        <ul className="list-size">
                            {property.fields.map((field, index) => (
                                <li key={index} className="item-list">
                                    <button className="item-list-button">
                                        {field.field_type}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="size">
                        <span>Horarios:</span>
                        <ul className="list-size">
                            {property.schedules.map((sch, index) => (
                                <li key={index} className="item-list">
                                    <button className="item-list-button">
                                        {sch.schedule}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </StyledWrapper>
        </div>
    )
}
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

  .`;



export default PropertyItem