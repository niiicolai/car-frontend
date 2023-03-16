
import './iconBadge.css'

export default function createIconBadge(maxTime, className, fontawesomeComplete, fontawesomeSpinner) {
    const wrapper = createWrapperElement(className);
    const counter = createTextElement(maxTime);
    const spinner = createIconElement(fontawesomeSpinner);
    wrapper.appendChild(counter);
    wrapper.appendChild(spinner);

    startInterval(maxTime, counter, spinner, fontawesomeComplete);

    return wrapper;
}

function createWrapperElement(className) {
    const e = document.createElement('div');
    e.className = `iconBadge iconBadge-fadeIn ${className}`;
    return e;
}

function createTextElement(counter) {
    const e = document.createElement('p');
    e.innerText = counter;
    return e;
}

function createIconElement(fontawesome) {
    const e = document.createElement('i');
    e.className = `spinner ${fontawesome}`;
    return e;
}

function startInterval(maxTime, counter, spinner, fontawesomeComplete) {
    const interval = setInterval(() => {
        maxTime -= 1;
        counter.innerText = maxTime;
        if (maxTime <= 0) {
            clearInterval(interval);
            counter.innerText = "";
            spinner.className = `spinner iconBadge-fadeIn ${fontawesomeComplete}`;
        }
            
    }, 1000);

}