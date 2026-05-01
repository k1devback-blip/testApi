const _0x4a2b = ['replace', 'set', 'toLowerCase', 'startsWith', 'manual', 'half', 'GET', 'HEAD', 'no-store, no-cache, must-revalidate', 'Server', 'server', 'X-Accel-Buffering', 'no', 'Cache-Control', 'text/html', 'Error', '/favicon.ico', '/', 'host', 'connection', 'proxy-connection', 'keep-alive', 'via', 'forwarded', 'x-forwarded-for', 'x-forwarded-proto', 'x-forwarded-host', 'x-real-ip', 'cf-ray', 'cf-connecting-ip', 'x-vercel-id', 'x-vercel-proxy-signature', 'Busy', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0', 'User-Agent', '<html><body><h1>System Status: OK</h1></body></html>'];

const _0x1b7c = function(_0x2d8f) {
    return _0x4a2b[_0x2d8f];
};

export const config = {runtime: "edge"};

const _0x3c9d = (process.env.DATA_API_TEST || "")[_0x1b7c(0)](/\/$/, "");
const _0x5e2a = 0x14;
let _0x7f4b = 0x0;

const _0x9d6c = new Set([
    _0x1b7c(17), _0x1b7c(18), _0x1b7c(19), _0x1b7c(20), _0x1b7c(21), _0x1b7c(22),
    _0x1b7c(23), _0x1b7c(24), _0x1b7c(25), _0x1b7c(26), _0x1b7c(27), _0x1b7c(28),
    _0x1b7c(29), _0x1b7c(30)
]);

export default async function _0xabcd(_0x3f1a) {
    if (_0x7f4b >= _0x5e2a) {
        return new Response(_0x1b7c(31), {status: 0x1f7});
    }

    const _0x4e2b = new URL(_0x3f1a.url);
    if (_0x4e2b.pathname === _0x1b7c(16) || _0x4e2b.pathname === _0x1b7c(15)) {
        return new Response(_0x1b7c(34), {
            status: 0xc8,
            headers: {"content-type": _0x1b7c(13)}
        });
    }

    _0x7f4b++;
    try {
        const _0x5f3c = _0x3c9d + _0x4e2b.pathname + _0x4e2b.search;
        const _0x6a4d = new Headers();
        
        for (const [_0x7b5e, _0x8c6f] of _0x3f1a.headers) {
            const _0x9d7e = _0x7b5e[_0x1b7c(2)]();
            if (!_0x9d6c.has(_0x9d7e) && !_0x9d7e[_0x1b7c(3)]("x-vercel-")) {
                _0x6a4d[_0x1b7c(1)](_0x7b5e, _0x8c6f);
            }
        }

        _0x6a4d[_0x1b7c(1)](_0x1b7c(33), _0x1b7c(32));

        const _0xae6f = {
            method: _0x3f1a.method,
            headers: _0x6a4d,
            redirect: _0x1b7c(4)
        };

        if (_0x3f1a.method !== _0x1b7c(6) && _0x3f1a.method !== _0x1b7c(7)) {
            _0xae6f.body = _0x3f1a.body;
            _0xae6f.duplex = _0x1b7c(5);
        }

        const _0xbf7g = await fetch(_0x5f3c, _0xae6f);
        const _0xc0a8 = new Headers();
        
        for (const [_0xd1b9, _0xe2ca] of _0xbf7g.headers) {
            const _0xf3db = _0xd1b9[_0x1b7c(2)]();
            if (!_0x9d6c.has(_0xf3db) && !_0xf3db[_0x1b7c(3)]("x-vercel-") && _0xf3db !== _0x1b7c(10)) {
                _0xc0a8[_0x1b7c(1)](_0xd1b9, _0xe2ca);
            }
        }

        _0xc0a8[_0x1b7c(1)](_0x1b7c(11), _0x1b7c(12));
        _0xc0a8[_0x1b7c(1)](_0x1b7c(9), _0x1b7c(8));

        return new Response(_0xbf7g.body, {
            status: _0xbf7g.status,
            headers: _0xc0a8
        });

    } catch (_0x4f5c) {
        return new Response(_0x1b7c(14), {status: 0x1f6});
    } finally {
        _0x7f4b--;
    }
}
