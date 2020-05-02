import React from 'react';
import PropTypes from 'prop-types';
import { formatMoney } from './Util';


// TODO make more generic
function owed(data) {
    let costs = data.reduce((people, d) => {
        if (!(d.Who in people)) {
            people[d.Who] = 0.0;
        }
        people[d.Who] += d.Cost;
        return people;
    }, {});
    return costs;
}

const shouldSpend = {
    "Saahil Claypool": .6,
    "Sarah Bottari": .4
}

function Message(name, spent, shouldSpent, owes) {
    return (
        <div className="Message" key={name}>
            <strong>{name}</strong> has spent {formatMoney(parseFloat(spent))}.
        <br />
            {(() => {
                if (owes > 0) {
                    return <p>They owe {formatMoney(owes)}</p>
                } else {
                    return <span></span>
                }
            })()}
        </div>)
}

function InfoView(props) {
    
    let data = props.data.filter(d => !d.Personal); 
    let costs = owed(data);
    let msgs = [];
    let totalSpent = 0;

    for (const person in costs) {
        let spent = costs[person]
        totalSpent += spent;
    }

    for (const person in costs) {
        let spent = costs[person]
        let shouldHaveSpent = totalSpent * (person in shouldSpend ? shouldSpend[person] : 0.5)
        let owes = shouldHaveSpent - spent;
        msgs.push(Message(person, spent, shouldHaveSpent, owes));
    }

    return (
        <div className="InfoView">
            {msgs}
        </div>
    );
}


InfoView.propTypes = {
    data: PropTypes.array,
}

export default InfoView;