import { useCubeQuery } from '@cubejs-client/react';

const useCubeData = (query) => {
    const { resultSet, error, isLoading } = useCubeQuery(query);
    if (resultSet && resultSet.loadResponses[0].external !== true) {
        console.warn('Preaggregation not used for query:', resultSet.loadResponses[0].query);
    }

    return { resultSet, error, isLoading };
};

export default useCubeData;