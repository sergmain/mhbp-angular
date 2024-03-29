import { IEnvironment } from './IEnvironment';

export const environment: IEnvironment = {
    production: false,
    baseUrl: 'http://localhost:8080/rest/v1/',
    hashLocationStrategy: true,
    userLifeTime: 30 * 60 * 1000, // 30 minutes
    isSslRequired: false,
    batchInterval: 10 * 1000, // pause between requests in milliseconds, 0 means a disable of any requests
    language: 'EN',
    brandingTitle: 'Metaheuristic',
    brandingMsg:
        '<b>Metaheuristic behavior platform</b><p>Metaheuristic behavior platform is a SaaS for continuous evaluating and assesing quality of LLMs.</p>' +
        '<ul><li>' +
        '<p>Evaluting and assesing quality</p>' +
        'MHBP is scheduling requests to LLM and execute such requests. Collect the answers to prompt and evaluate them.' +
        '</li>' +
        '<li>' +
        '<p>Decisions which are based on the result of evaluatin.</p>' +
        'Base on the result of evaluating and assesing MHBP can create triggers, events, or call API to inform 3rd parties, if quality of tested LLM was degraded.' +
        '</li>' +
        '</ul>'
    ,
    brandingMsgIndex:
        '<b>Metaheuristic behavior platform</b><p>Metaheuristic behavior platform is a SaaS for continuous evaluating and assesing quality of LLMs.</p>' +
        '<ul><li>' +
        '<p>Evaluting and assesing quality</p>' +
        'MHBP is scheduling requests to LLM and execute such requests. Collect the answers to prompt and evaluate them.' +
        '</li>' +
        '<li>' +
        '<p>Decisions which are based on the result of evaluatin.</p>' +
        'Base on the result of evaluating and assesing MHBP can create triggers, events, or call API to inform 3rd parties, if quality of tested LLM was degraded.' +
        '</li>' +
        '</ul>'
};
