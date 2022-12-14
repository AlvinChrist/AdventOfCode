const fs = require('fs');
try {
    const queries = fs.readFileSync('a.txt', 'utf8').split('\r\n');
    const vis = []
    const grid = queries.map((lines) => lines.split('').map((x) => +x))
    const n = grid.length;
    const m = grid[0].length;

    let count = 0;
    for(let i = 1; i < n-1; i++) {
        vis[i] = []
        const cols = grid[i]
        const left = cols[0];
        const right = cols[m - 1];
        
        for(let j = 1; j < m-1; j++) {
            const top = grid[0][j];
            const bottom = grid[n-1][j];
            if(left >= cols[j] && right >= cols[j] && top >= cols[j] && bottom >= cols[j]) {
                vis[i][j] = -1
                continue;
            }
            if(vis[i][j] || vis[i][j] === -1) continue;
            if(left < cols[j]) {
                let valid = true;
                for(let k = 1; k < j; k++) {
                    if(cols[k] >= cols[j]) {
                        valid = false;
                        break;
                    }
                }
                if(valid) {
                    count++
                    // console.log(i, j, cols[j])
                    if(!vis[i]) {
                        vis[i] = []
                    }
                    vis[i][j] = true;
                }
            }
            if(vis[i][j] || vis[i][j] === -1) continue;
            if(right < cols[j]) {
                let valid = true;
                for(let k = j + 1; k < m - 1; k++) {
                    if(cols[k] >= cols[j]) {
                        valid = false;
                        break;
                    }
                }
                if(valid) {
                    count++;
                    // console.log(i, j, cols[j])
                    if(!vis[i]) {
                        vis[i] = []
                    }
                    vis[i][j] = true;
                }
            }
        }
    }

    for(let i = 1; i < m-1; i++) {
        const top = grid[0][i];
        const bottom = grid[n-1][i];

        for(let j = 1; j < n-1; j++) {
            if(vis[j][i] || vis[j][i] === -1) continue;
            if(top < grid[j][i]) {
                let valid = true;
                for(let k = 1; k < j; k++) {
                    if(grid[k][i] >= grid[j][i]) {
                        valid = false;
                        break;
                    }
                }
                if(valid) {
                    count++
                    // console.log(i, j, cols[j])
                    if(!vis[j]) {
                        vis[j] = []
                    }
                    vis[j][i] = true;
                }
            }
            if(vis[j][i] || vis[j][i] === -1) continue;
            if(bottom < grid[j][i]) {
                let valid = true;
                for(let k = j + 1; k < n - 1; k++) {
                    if(grid[k][i] >= grid[j][i]) {
                        valid = false;
                        break;
                    }
                }
                if(valid) {
                    count++;
                    // console.log(i, j, cols[j])
                    if(!vis[j]) {
                        vis[j] = []
                    }
                    vis[j][i] = true;
                }
            }
        }
    }
    console.log(count + 2 * (m + n) - 4)
    
} catch (e) {
    console.log(e)
}